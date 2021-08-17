import cli from "./cli.config.js";
import setting from "./setting.config.js";
import theme from "./theme.config.js";
import network from "./net.config.js";
export default {
  ...cli,
  ...setting,
  ...theme,
  ...network,
};
