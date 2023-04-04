import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState<Image>(null);
  const [name, setName] = useState("");
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [ratio, setRatio] = useState<number>();
  const [weight, setWeight] = useState<any>();

  type Image = any;

  let img: any;

  const handleDrop = (e: any) => {
    e.preventDefault();
    let reader = new FileReader();
    reader.onload = (event) => {
      img = new Image();
      if (!img) return;

      if (typeof event?.target?.result === "string") {
        img.src = event.target.result;
      }

      img.onload = () => {
        setImage(img);
        setHeight(Number(img?.height));
        setWidth(Number(img?.width));
        setRatio(img?.width / img?.height);
        setWeight((e.dataTransfer.files[0].size / 1024).toFixed(2));
      };
    };
    let file = e.dataTransfer.files[0];
    setWeight((e.dataTransfer.files[0].size / 1024).toFixed(2));
    setName(file.name);

    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!image) return;

    let canvas = document.createElement("canvas");
    if (!canvas) return;

    canvas.width = 600;
    canvas.height = 400;
    let ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(image, 0, 0, 600, 400);

    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpg", 0.92);
    link.download = `${name.split(".")[0]}.jpg`;
    link.click();
  };

  const handleDownloadWEBP = () => {
    if (!image) return;

    let canvas = document.createElement("canvas");
    if (!canvas) return;

    canvas.width = 600;
    canvas.height = 400;
    let ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(image, 0, 0, 600, 400);

    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/webp", 0.92);
    link.download = `${name.split(".")[0]}.webp`;
    link.click();
  };

  return (
    <div className="App">
      <div className="left">
        <div
          className="drop"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {!image ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_6_12229)">
                <path
                  d="M15 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V7L15 2ZM6 20V4H14V8H18V20H6ZM16 10V15C16 17.21 14.21 19 12 19C9.79 19 8 17.21 8 15V8.5C8 7.03 9.26 5.86 10.76 6.01C12.06 6.14 13 7.33 13 8.64V15H11V8.5C11 8.22 10.78 8 10.5 8C10.22 8 10 8.22 10 8.5V15C10 16.1 10.9 17 12 17C13.1 17 14 16.1 14 15V10H16Z"
                  fill="#323232"
                />
              </g>
              <defs>
                <clipPath id="clip0_6_12229">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <img width={200} src={image.src} />
          )}
        </div>{" "}
        <div>
          {image ? (
            <>
              <strong>{name}</strong>
              <p>
                Size: {width}x{height}
              </p>
              <p>Weight: {weight}ko</p>

              {ratio === 1.5 ? (
                <p>
                  Ratio: <span style={{ color: "green" }}>{ratio}</span>
                </p>
              ) : (
                <p>
                  Ratio (has to be 1.5):
                  <span style={{ color: "red" }}>{ratio}</span>
                </p>
              )}
              <button
                onClick={handleDownload}
                style={{
                  cursor: "pointer",
                }}
              >
                Download JPEG
              </button>
              <button
                onClick={handleDownloadWEBP}
                style={{
                  cursor: "pointer",
                }}
              >
                Download WEBP
              </button>
            </>
          ) : (
            <div>
              <p>&larr; Drop an image here to resize</p>
            </div>
          )}
        </div>
      </div>
      <div className="bottom">
        <p>
          <a
            href="https://tinyjpg.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tiny jpg
          </a>{" "}
          to reduce the weight.
        </p>
        <p>
          <a
            href="https://tinyjpg.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Remove.bg
          </a>{" "}
          to remove the background.
        </p>
      </div>
    </div>
  );
}

export default App;
