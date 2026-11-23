import './Utils/long-safe.js';
import makeWASocket from './Socket/index.js';
import { DEFAULT_CONNECTION_CONFIG } from './Defaults/index.js';
import chalk from "chalk";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

// ---------- Banner Baileys ----------
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readPkg = () => {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));
    } catch {
        return {};
    }
};

const showBanner = () => {
    // tampil sekali saja, bisa dimatikan dengan BAILEYS_SILENT=1
    if (process.env.BAILEYS_SILENT || globalThis.__ikyBaileysBanner) return;
    globalThis.__ikyBaileysBanner = true;

    const pkg = readPkg();
    const main = chalk.hex("#00c2ff");
    const waVersion = DEFAULT_CONNECTION_CONFIG?.version?.join(".") ?? "-";
    const row = (k, v) => `  ${chalk.gray(k.padEnd(10))} ${chalk.white(":")} ${v}`;

    console.log(main(`
██╗ ██╗  ██╗ ██╗   ██╗
██║ ██║ ██╔╝ ╚██╗ ██╔╝
██║ █████╔╝   ╚████╔╝
██║ ██╔═██╗    ╚██╔╝
██║ ██║  ██╗    ██║
╚═╝ ╚═╝  ╚═╝    ╚═╝
`));
    console.log(main("  " + "─".repeat(42)));
    console.log(row("Library", main.bold(pkg.name ?? "Iky Baileys")));
    console.log(row("Versi", chalk.yellow(`v${pkg.version ?? "unknown"}`)));
    console.log(row("WA Web", chalk.green(waVersion)));
    console.log(row("Node.js", process.version));
    console.log(row("Platform", `${os.platform()} ${os.arch()}`));
    console.log(row("Author", "Iky"));
    console.log(row("Telegram", chalk.cyan("https://t.me/IkyDays")));
    console.log(main("  " + "─".repeat(42)) + "\n");
};

showBanner();

export * from '../WAProto/index.js';
export * from './Utils/index.js';
export * from './Types/index.js';
export * from './Defaults/index.js';
export * from './WABinary/index.js';
export * from './WAM/index.js';
export * from './WAUSync/index.js';
export * from './Store/index.js';
export { makeWASocket };
export default makeWASocket;
