// Banner page — optimized for print/display on banners and trade show stands
// Large logo, QR code, clear CTA, phone number

export default function Banner() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-8 py-12"
      style={{ background: '#080808' }}
    >
      {/* Logo — maximum size */}
      <img
        src="/logo.png"
        alt="111 Elite Car Service"
        className="mx-auto mb-10"
        style={{
          height: 'clamp(160px, 25vw, 320px)',
          maxWidth: '500px',
          width: '100%',
          objectFit: 'contain',
        }}
      />

      <div className="w-20 h-px bg-gold-500 mx-auto mb-10" />

      {/* QR Code */}
      <div className="mb-6">
        <img
          src="/qrcode.png"
          alt="QR Code — Scan to visit 111elitecarservice.com"
          className="mx-auto"
          style={{
            width: 'clamp(180px, 30vw, 280px)',
            height: 'clamp(180px, 30vw, 280px)',
          }}
        />
      </div>

      {/* CTA text */}
      <p
        className="font-serif text-gold-400 mb-2"
        style={{ fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', letterSpacing: '0.15em' }}
      >
        SCAN TO BOOK
      </p>
      <p className="text-gray-500 text-sm tracking-widest uppercase mb-10">
        or visit 111elitecarservice.com
      </p>

      {/* Phone number */}
      <a
        href="tel:+17326424885"
        className="text-white font-serif"
        style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)' }}
      >
        (732) 642-4885
      </a>
      <p className="text-gray-600 text-xs tracking-widest uppercase mt-2">
        Available 24 / 7
      </p>

      <div className="w-20 h-px bg-gold-500/30 mx-auto mt-10 mb-6" />

      <p className="text-gold-500/60 text-xs tracking-widest uppercase">
        Luxury Chauffeur Service &nbsp;·&nbsp; Palm Beach &amp; Treasure Coast
      </p>
    </div>
  )
}
