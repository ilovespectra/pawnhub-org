import { useState, useEffect } from "react";
import { FaCopy } from 'react-icons/fa';

const SolanaInstallationGuide: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to track loading status
  
    const generateKeyPair = async () => {
      setIsLoading(true); // Set loading state to true when key generation starts
      try {
        const response = await fetch('/api/generateKey');
        if (!response.ok) {
          throw new Error('Failed to generate keypair');
        }
        const keyPairData = await response.text(); // Get the key pair data from the response
        const blob = new Blob([keyPairData], { type: 'application/json' });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'pawn-keypair.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error('Error generating keypair:', error);
      } finally {
        setIsLoading(false); // Set loading state to false when key generation completes (whether successful or not)
      }
    };
    
    const [copied, setCopied] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);

    const copyToClipboard = () => {
        navigator.clipboard.writeText("solana-keygen grind --starts-with pawn:1 ");
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    useEffect(() => {
      const handleResize = () => {
          setShowInstructions(window.innerWidth > 760);
      };

      handleResize(); // Initial check

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
  }, []);


    return (
        <div className="container">
            <div className="instructions">
                <h1>Pawn Keygen</h1>
                <p>
                    Run this command to create a unique keypair starting with &apos;pawn&apos;<br></br><br></br>
                </p>
                <div className="code-container">
                    <code>solana-keygen grind --starts-with pawn:1</code>
                    <button className="copy-btn" onClick={copyToClipboard}>
                        <FaCopy />
                    </button>
                    {copied && <span className="copied-msg">Copied!</span>}
                </div>
            </div>
            {showInstructions ? (
                <>
                    <p><i>Required: Solana CLI Tool Suite</i></p>
                    <div className="installation-guide">
                    <h2>Use Solana&apos;s Install Tool (Simplest option)</h2>
          <p>
            <h2>MacOS & Linux</h2>
            &bull; Open your favorite Terminal application and run the following command:
            <br /><br></br>
            <div className="code-container">
            <code>sh -c &quot;$(curl -sSfL https://release.solana.com/v1.18.4/install)&quot;</code>
            <button className="copy-btn" onClick={copyToClipboard}>
                        <FaCopy />
                    </button>
                    {copied && <span className="copied-msg">Copied!</span>}
            </div><br></br>
            <p>&bull; You can replace <code>v1.18.4</code> with the release tag matching the software version of your desired release, or use one of the three symbolic channel names: <code>stable</code>, <code>beta</code>, or <code>edge</code>.</p>

            &bull; The following output indicates a successful update:
          </p><br></br>
          <div className="code-container">
          <code>
          downloading v1.18.4 installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: v1.18.4
* Release URL: https://github.com/solana-labs/solana/releases/download/v1.18.4/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
</code>
<button className="copy-btn" onClick={copyToClipboard}>
                        <FaCopy />
                    </button>
                    {copied && <span className="copied-msg">Copied!</span>}
          </div><br></br>
          <p>&bull; Depending on your system, the end of the installer messaging may prompt you to</p>
          <code>Please update your PATH environment variable to include the solana programs:</code><br></br><br></br>
          <p>
            <p>&bull; If you get the above message, copy and paste the recommended command below it to update <code>PATH</code><br></br><br></br>
            &bull; Confirm you have the desired version of solana installed by running:</p>
<div className="code-container">
    <code>
solana --version
</code>
<button className="copy-btn" onClick={copyToClipboard}>
                        <FaCopy />
                    </button>
                    {copied && <span className="copied-msg">Copied!</span>}
</div><br></br>
<h2>Windows</h2>
            &bull; Open a Command Prompt as an Administrator and run the following commands:
            <br /><br></br>
            <div className="code-container">
            <code>cmd /c &quot;curl https://release.solana.com/v1.18.4/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs&quot;</code>
            <button className="copy-btn" onClick={copyToClipboard}>
                        <FaCopy />
                    </button>
                    {copied && <span className="copied-msg">Copied!</span>}
                    </div>
            <br />
            <p>
            Copy and paste the following command, then press Enter to install the latest version of Solana. If you see a security pop-up by your system, please select to allow the program to run.
            </p><br></br>
            <div className="code-container">
            <code>C:\solana-install-tmp\solana-install-init.exe v1.18.4</code>
            <button className="copy-btn" onClick={copyToClipboard}>
                        <FaCopy />
                    </button>
                    {copied && <span className="copied-msg">Copied!</span>}
                    </div>
          </p>
          <p><br></br>
          &bull; When the installer is finished, press Enter.<br></br><br></br>

          &bull; Close the command prompt window and re-open a new command prompt window as a normal user<br></br><br></br>

          &bull; Search for &apos;Command Prompt&apos; in the search bar, then left click on the Command Prompt app icon, no need to run as Administrator)<br></br><br></br>
Confirm you have the desired version of solana installed by entering:
          </p><br></br>
          <div className="code-container">
    <code>
solana --version
</code>
<button className="copy-btn" onClick={copyToClipboard}>
                        <FaCopy />
                    </button>
                    {copied && <span className="copied-msg">Copied!</span>}
</div><br></br>
<p>
&bull; After a successful install, <code>solana-install update</code> may be used to easily update the Solana software to a newer version at any time.
</p>
  
          <h2>Download Prebuilt Binaries</h2>
          <p>
          If you would rather not use solana-install to manage the install, you can manually download and install the binaries.
          </p>
          <p>
            <h2>Linux</h2>
            Download <a href="https://github.com/solana-labs/solana/releases/latest">solana-release-x86_64-unknown-linux-gnu.tar.bz2</a> and extract it.
          </p>
          <div className="code-container">
            <code>
          tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
</code>
<button className="copy-btn" onClick={copyToClipboard}>
                        <FaCopy />
                    </button>
                    {copied && <span className="copied-msg">Copied!</span>}
</div><br></br>
          <p>
          <h2>MacOS</h2>
            Download <a href="https://github.com/solana-labs/solana/releases/latest">solana-release-x86_64-apple-darwin.tar.bz2</a> and extract it.
          </p>
          <div className="code-container">
            <code>
            tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
</code>
<button className="copy-btn" onClick={copyToClipboard}>
                        <FaCopy />
                    </button>
                    {copied && <span className="copied-msg">Copied!</span>}
</div><br></br>
          <p>
          <h2>Windows</h2>
            Download <a href="https://github.com/solana-labs/solana/releases/latest">solana-release-x86_64-pc-windows-msvc.tar.bz2</a> and extract it.
          </p>
          <p>&bull; Open a Command Prompt and navigate to the directory into which you extracted the binaries and run:</p>
          <div className="code-container">
            <code>
            cd solana-release/
set PATH=%cd%/bin;%PATH%
</code>
<button className="copy-btn" onClick={copyToClipboard}>
                        <FaCopy />
                    </button>
                    {copied && <span className="copied-msg">Copied!</span>}
</div><br></br>
          <h2>Build From Source</h2>
          <p>For Debian and Other Linux Distributions, macOS, and Windows, please refer to the <a href="https://docs.solana.com/cli/install-solana-cli-tools#build-from-source">official documentation</a> for detailed instructions.</p>
          <div className="source-link">
            <br></br>
                <p><i>Reference: <a href="https://docs.solanalabs.com/cli/install" target="_blank" rel="noopener noreferrer">Official Solana Docs</a></i></p>
            </div>
        </div>
                </>
            ) : (
                <div className="desktop-message">
                    For installation instructions, view on desktop.
                </div>
            )}
            <style jsx>{`

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: black;
    font-family: Arial, sans-serif;
    color: white;
    
  }
  .pawn-keygen {
    text-align: center;
    margin-bottom: 30px;
  }
  .installation-guide {
    background-color: grey600;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  h1 {
    margin-bottom: 20px;
    font-size: 2em;
  }
  h2 {
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 1em;
    text-align: center;
    font-weight: bold;
  }
  p {
    margin-bottom: 15px;
  }
  code {
    padding: 2px 5px;
    font-size: 0.8em;
    border-radius: 3px;
    font-family: monospace;
  }
  a {
    color: #007bff;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: black;
                    font-family: Arial, sans-serif;
                }
                h1 {
                    margin-bottom: 20px;
                    font-size: 2em;
                    text-align: center; /* Center the heading */
                }
                .instructions {
                    margin-bottom: 30px;
                }
                .code-container {
                    position: relative;
                    background-color: #222; /* Darken the background */
                    border-radius: 3px;
                    padding: 5px;
                }
                code {
                    font-family: monospace;
                    color: white; /* Change text color */
                }
                .copy-btn {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    margin-left: 10px; /* Add margin to the left */
                }
                .copied-msg {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    color: green;
                    font-size: 0.8em;
                }
            `}</style>
        </div>
    );
};

export default SolanaInstallationGuide;
