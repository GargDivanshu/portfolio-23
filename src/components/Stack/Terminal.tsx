import React , {useState} from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

const TerminalController = (props = {}) => {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>My skillset | TypeScript | Javascipt | NextJS | ReactJS | </TerminalOutput>
  ]);
  // Terminal has 100% width by default so it should usually be wrapped in a container div
  return (
    <div className="container h-[100px]">
      <Terminal 
      class="text-left"
      height={ 200 }
      name='' colorMode={ ColorMode.Dark }  onInput={ terminalInput => console.log(`New terminal input received: '${ terminalInput }'`) }>
        { terminalLineData }
      </Terminal>
    </div>
  )
};

export default TerminalController;