const SITE_ROOT = process.env.SamplesOutput || "../../../SamplesOutput";
const EXTENSION_NAME = "ConversionSampleWebExtension";
const MODULES_DIR = SITE_ROOT + "/Site/Content/Modules";

module.exports.STYLES_DIR =  `${MODULES_DIR}/${EXTENSION_NAME}`;
module.exports.BUNDLE_DIR =  `${MODULES_DIR}/${EXTENSION_NAME}`;