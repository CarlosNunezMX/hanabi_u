import { appendFileSync, writeFileSync, writeSync } from "fs"
import { resolve } from "path";
import { execSync } from "child_process";
import { appendFile } from "fs/promises";
const ToWrite = (dep) => `\nimport "${dep}"`;
const installers = [{
    installer: 'pnpm',
    command: 'pnpm add -D'
}, {
    installer: 'yarn',
    command: 'yarn add -D'
}, {
    installer: 'npm',
    command: 'npm install -D'
}];

function ReplaceAlias(input){
    const replacements = [{
        alias: '@wiiu-types/',
        rules: '@pretendonetwork/wiiu-$-types'
    }];

    let x = replacements.find(replacement => input.includes(replacement.alias));
    if(!x)
        return input;

    let removed = input.replace(x.alias, '');
    return x.rules.replace('$', removed);
}

function ShowHelp() {
    console.log(`Hanabi Deps Installer.
Usage: installer [package]

Alias:
    @wiiu-types/[package] - @pretendonetwork/wiiu-[package]-types

Developed with ♥ by CarlosNunezMX
`)
}

const [_, __, ...deps] = process.argv;
if (deps.length == 0 || deps[0].toLowerCase() === 'help') {
    ShowHelp()
    process.exit(0)
}

function Install() {
    let installer;
    for (let i = 0; i < installers.length; i++) {
        let inst = installers[i];
        try {
            console.log(`[Hanabi - Deps] - Searching for ${inst.installer} in your system`);
            execSync(`${inst.installer} -v`);
            installer = inst;
            console.log(`[Hanabi - Deps] - ${inst.installer} Fount!`)
            break;
        }

        catch (err) {
            console.log(`[Hanabi - Deps] - ${inst.installer} not fount!`)
        }
    }

    if (!installer) {
        throw "Not installer fount!"
    }

    const dep = deps.map(dep => ReplaceAlias(dep))
    dep.map(dep => {
        try{
            console.log(`[Hanabi - Deps] - Installing ${dep} with ${installer.installer}`)
            execSync(`${installer.command} ${dep}`);
            console.log(`[Hanabi - Deps] - Installed ${dep}, adding to global.d.ts`);
            appendFileSync(resolve(process.cwd(), 'global.d.ts'), ToWrite(dep));
            console.log(`[Hanabi - Deps] - Installed ${dep}!`);
        }catch(err){
            console.error(`[Hanabi - Deps] - Can't install ${dep}`, err);
        }
    })
}

console.log(`[Hanabi - Deps] - Installing ${deps.length} deps...`)
Install()