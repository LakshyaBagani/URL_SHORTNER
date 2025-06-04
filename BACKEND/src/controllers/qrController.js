import qrCode from "qrcode";
import urlSchema from "../models/urlModel.js";

export const generateQR = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send({ success: false, message: "URL is required" });
  }

  try {
    const qr = await qrCode.toDataURL(url);
    const postUrl = await urlSchema.findOne({full_urls:url});
    if(postUrl){
      postUrl.qrLink = qr
      await postUrl.save();
    }
    res.status(200).send({ success: true, message: "QR has been generated", qr});
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
