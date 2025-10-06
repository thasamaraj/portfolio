// Build a standards-friendly vCard and a QR that most phones accept (MECARD).
(function () {
    const nameFull   = "Joseph Thasamaraj";
    const nameLast   = "Thasamaraj";
    const nameFirst  = "Joseph";
    const tel        = "+919841245551";
    const email      = "29.joseph@gmail.com";
    const url        = "https://thasamaraj.github.io/portfolio/";
    const city       = "Chennai";
    const country    = "India";
    const title      = "Senior Manager — UX Design, Research & Strategy";
  
    // vCard 3.0 (widely supported on iOS/Android)
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${nameLast};${nameFirst};;;`,
      `FN:${nameFull}`,
      `TITLE:${title}`,
      `TEL;TYPE=CELL:${tel}`,
      `EMAIL;TYPE=INTERNET,WORK:${email}`,
      `URL:${url}`,
      `ADR;TYPE=WORK:;;${city};;;;${country}`,
      "END:VCARD"
    ].join("\r\n");
  
    // Create a downloadable .vcf link
    const vcfBlob = new Blob([vcard], { type: "text/vcard" }); // "text/x-vcard" also works
    const vcfUrl  = URL.createObjectURL(vcfBlob);
    const vcfLink = document.getElementById("vcfLink");
    if (vcfLink) vcfLink.href = vcfUrl;
  
    // Build a compact MECARD payload for the QR (QR codes have practical size limits)
    // Most phone cameras will offer "Add to contacts" directly on scan.
    const mecard = [
      "MECARD:",
      `N:${nameFull};`,
      `TEL:${tel};`,
      `EMAIL:${email};`,
      `URL:${url};`,
      // optional NOTE or ADR if you want them in the QR too:
      // `ADR:${city}, ${country};`,
      ";"
    ].join("");
  
    // Render QR into the canvas
    const canvas = document.getElementById("qrCanvas");
    if (canvas && window.QRCode) {
      QRCode.toCanvas(canvas, mecard, { width: canvas.width, margin: 1 }, function (err) {
        if (err) console.error("QR generation failed:", err);
      });
    }
  })();
  