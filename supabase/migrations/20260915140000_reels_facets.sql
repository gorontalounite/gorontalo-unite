-- Facets for the Reels filters, so the page stops loading the archive to
-- build three dropdowns.
--
-- /reels used to fetch every published reel and work everything out in the
-- browser: which years exist, which accounts, how many each has. At 1160 rows
-- that is a megabyte of JSON sent to a phone so it can render about seventy
-- cards. The rows themselves are now fetched per shelf; this covers the part
-- that genuinely needs to see the whole table.
--
-- PostgREST cannot express a GROUP BY, which is why this is a function rather
-- than a view queried from the client.
--
-- security invoker, so the caller's RLS still decides what counts. Anonymous
-- readers see published, non-binned rows and nothing else — the same set the
-- page renders.

create or replace function public.reels_facets()
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  with live as (
    select account_username, publish_time
      from public.reels
     where status = 'published'
       and deleted_at is null
  )
  select jsonb_build_object(
    'total', (select count(*) from live),
    -- The year a reader sees is the Gorontalo year, not UTC: a reel posted at
    -- 06:00 on 1 January is last year in UTC and would file itself under the
    -- wrong chip.
    'years', (
      select coalesce(jsonb_agg(y order by y desc), '[]'::jsonb)
        from (
          select distinct to_char(publish_time at time zone 'Asia/Makassar', 'YYYY') as y
            from live
        ) t
    ),
    'accounts', (
      select coalesce(
        jsonb_agg(jsonb_build_object('username', account_username, 'count', n)
                  order by n desc, account_username),
        '[]'::jsonb)
        from (
          select account_username, count(*) as n
            from live
           group by account_username
        ) a
    )
  );
$$;

comment on function public.reels_facets() is
  'Years and per-account counts for the /reels filters. Lets the page build its dropdowns without downloading every row.';

grant execute on function public.reels_facets() to anon, authenticated;
