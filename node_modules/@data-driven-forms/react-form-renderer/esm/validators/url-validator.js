import Validators from '../validators';
import { assign } from '../common/helpers'; // user:pass BasicAuth (optional)

var BASIC_AUTH = '(?:\\S+(?::\\S*)?@)?'; // IP address dotted notation octets

var IPV4 = '(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)'; // the IPv6 matching part is from here: https://gist.github.com/syzdek/6086792

var IPV6 = '((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}|::1|1::'; // eslint-disable-line max-len
// host & domain names, may end with dot

var HOST = // can be replaced by
// '(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+' +
"(?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+" + // TLD identifier name, may end with dot
"(?:[a-z\\u00a1-\\uffff]{2,}\\.?)"; // port number (optional)

var PORT = '(?::\\d{2,5})?'; // resource path (optional)

var PATH = '(?:[/][^\\s?#]*)?';
var SEARCH = '(?:[?][^\\s#]*)?';
var HASH = '(?:[#]\\S*)?';
var DEFAULT_OPTIONS = {
  emptyProtocol: true,
  protocolIdentifier: true,
  basicAuth: true,
  local: true,
  ipv4: true,
  ipv6: true,
  host: true,
  port: true,
  path: true,
  search: true,
  hash: true
};

var url = function url(options) {
  return buildReg(defaultOptions(options), false);
};

export default url;

function defaultOptions(options) {
  options = assign({}, DEFAULT_OPTIONS, options);
  options.protocols = [].concat(options.protocol || options.protocols || Validators.urlProtocols).join('|');
  return options;
}

function group(option, regPart, capture) {
  return option ? capture ? "(".concat(regPart, ")") : regPart : '';
}

function buildReg(options, capture) {
  return new RegExp('^' + group(true, "(?:(?:(?:".concat(options.protocols, "):)").concat(options.emptyProtocol ? '?' : '', "\\/\\/)").concat(options.protocolIdentifier ? '' : '?'), capture) + group(options.basicAuth, BASIC_AUTH, capture) + "(?:".concat([group(options.ipv4, IPV4, capture), group(options.ipv6, IPV6, capture), group(options.host, HOST, capture), group(options.local, 'localhost', capture)].filter(function (g) {
    return g;
  }).join('|'), ")") + group(options.port, PORT, capture) + group(options.path, PATH, capture) + group(options.search, SEARCH, capture) + group(options.hash, HASH, capture) + '$', 'i');
}