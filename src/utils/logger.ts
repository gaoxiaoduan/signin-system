import chalk from "chalk";

const log = console.log;

export const info = (...info: any[]) => log(chalk.blue(...info));
const warn = (...info: any[]) => log(chalk.yellow(...info));
const error = (...info: any[]) => log(chalk.bold.red(...info));

const logger = {
    info,
    warn,
    error
};

export default logger;