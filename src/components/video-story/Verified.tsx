/** The badge Instagram puts beside a name, drawn rather than imported. */
export default function Verified({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-label="terverifikasi" className={`shrink-0 fill-sky-400 ${className}`}>
      <path d="M12 1.6 14.3 4l3.3-.4 1 3.2 3 1.4-1.2 3.1 1.2 3.1-3 1.4-1 3.2-3.3-.4L12 22.4 9.7 20l-3.3.4-1-3.2-3-1.4 1.2-3.1L2.4 9.6l3-1.4 1-3.2 3.3.4L12 1.6Z" />
      <path d="m10.8 14.6-2.3-2.3 1-1 1.3 1.3 3.6-3.6 1 1-4.6 4.6Z" className="fill-black" />
    </svg>
  );
}
