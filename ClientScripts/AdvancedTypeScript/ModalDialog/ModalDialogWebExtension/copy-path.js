const ROOT = process.env.SamplesOutput || "../../../../SamplesOutput"
const SITE_ROOT = `${ROOT}/Site`;
const EXTENSION_NAME = "ModalDialogWebExtension";
const MODULES_DIR = SITE_ROOT + "/Content/Modules";

module.exports.STYLES_DIR =  `${MODULES_DIR}/${EXTENSION_NAME}`;
module.exports.BUNDLE_DIR =  `${MODULES_DIR}/${EXTENSION_NAME}`;