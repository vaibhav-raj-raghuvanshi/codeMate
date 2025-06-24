import atcoder from "../assets/logos/atcoder.png";
import codeforces from "../assets/logos/codeforces.png";
import codechef from "../assets/logos/codechef.png";
import leetcode from "../assets/logos/leetcode.png";
import defaultLogo from "../assets/logos/default.png";

const platformLogos = {
  codeforces,
  codechef,
  atcoder,
  leetcode,
};

export function getPlatformLogo(site) {
  const key = site?.toLowerCase?.(); // Handle undefined/null safely
  return platformLogos[key] ?? defaultLogo;
}
