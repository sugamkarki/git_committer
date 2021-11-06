#!/usr/bin/env node
const exec = require("child_process").exec;
const fs = require("fs");
const inquirer = require("inquirer");
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
const callGitCommit = async (
  date,
  message = "Tobey Maguire Is The Real Spiderman!!"
) => {
  await startCMD("git add .");
  await startCMD(`git commit --date="${date}" -m "${message}" `);
};
const startCMD = async (command) => {
  await execShellCommand(`${command} `);
};
const execShellCommand = async (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
};
const gitCommitLooper = async () => {
  const { year } = await inquirer.prompt([
    {
      message: "Pick the year you want to fill with commits:",
      name: "year",
    },
  ]);
  const { commit_text } = await inquirer.prompt([
    {
      message: "Pick the year you want to fill with commits:",
      name: "commit_text",
      default: "Tobey Maguire Is The Real Spiderman!!",
    },
  ]);
  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= 32; day++) {
      let date = year + "";
      if (month.toString().length === 1) {
        date += "." + "0" + month;
      } else {
        date += "." + month;
      }
      if (day.toString().length === 1) {
        date += "." + "0" + day;
      } else {
        date += "." + day;
      }
      fs.writeFileSync("COMMIT.MD", Math.random().toString());
      await delay(2000);
      console.log(date);
      callGitCommit(`${date}`, commit_text);
    }
  }
  await delay(5000);
  await startCMD(`git push`);
  await delay(15000);
};
(async () => {
  gitCommitLooper();
})();
