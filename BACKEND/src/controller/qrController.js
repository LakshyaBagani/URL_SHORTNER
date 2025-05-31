import qrCode from "qrcode";

export const generateQR = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send({ success: false, message: "URL is required" });
  }

  try {
    const qr = await qrCode.toDataURL(url);
    console.log("QR for the url is", qr);
    res.status(200).send({ success: true, message: "QR has been generated", qr});
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
