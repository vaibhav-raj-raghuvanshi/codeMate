import atcoder from "../assets/logos/atcoder.png";
import codeforces from "../assets/logos/codeforces.webp";
import leetcode from "../assets/logos/leetcode.png";

const platformLogos = {
    atcoder,
    codeforces,
    leetcode,
};

export function getPlatformLogo(platform) {
    return platformLogos[platform.toLowerCase()] || "";
}
