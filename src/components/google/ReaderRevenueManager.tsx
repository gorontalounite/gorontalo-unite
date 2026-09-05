import Script from "next/script";

const READER_REVENUE_MANAGER_INIT = `
  (self.SWG_BASIC = self.SWG_BASIC || []).push(function (basicSubscriptions) {
    basicSubscriptions.init({
      type: "NewsArticle",
      isPartOfType: ["Product"],
      isPartOfProductId: "CAow0bLMCw:openaccess",
      clientOptions: { theme: "light", lang: "id" },
    });
  });
`;

export default function ReaderRevenueManager() {
  return (
    <>
      <Script
        id="google-reader-revenue-manager"
        src="https://news.google.com/swg/js/v1/swg-basic.js"
        strategy="afterInteractive"
      />
      <Script id="google-reader-revenue-manager-init" strategy="afterInteractive">
        {READER_REVENUE_MANAGER_INIT}
      </Script>
    </>
  );
}
