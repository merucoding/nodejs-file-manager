import os from "os";
import { currDir } from "./currDir.js";

export function osInfo(input) {
  const arg = input.slice(3).trim();
  const systemCPU = os.cpus();
  const cpuRes = [];

  systemCPU.forEach((cpu, index) => {
    const clockRate = (cpu.speed / 1000).toFixed(2);
    cpuRes.push(`CPU ${index + 1}: Model: ${cpu.model}, Clock Rate: ${clockRate} GHz`)
  });

  switch (arg) {
    case "--EOL":
      console.log(`Default system End-Of-Line: ${JSON.stringify(os.EOL)}`);
      currDir();
      break;
    case "--cpus":
      console.log(`Overall amount of CPU: ${systemCPU.length}`);
      console.table(cpuRes);
      currDir();
      break;
    case "--homedir":
      console.log(os.homedir());
      currDir();
      break;
    case "--username":
      console.log(`--- The name of the kindest person in the world: ${os.userInfo().username} ---`);
      currDir();
      break;
    case "--architecture":
      console.log(`The operating system CPU architecture: ${os.arch()}`);
      currDir();
      break;
    default:
      console.log("Invalid input, should be: os operation");
  }
}
