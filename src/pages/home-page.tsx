import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import axios from "axios";

const VITE_OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const model = "whisper-1";

const HomePage = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [response, setResponse] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(response).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reseta após 2 segundos
      });
    }
  };

  React.useEffect(() => {
    if (!file) return;

    const fetchData = async () => {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", model);

      try {
        const res = await axios.post(
          "https://api.openai.com/v1/audio/transcriptions",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${VITE_OPENAI_API_KEY}`,
            },
          }
        );

        setResponse(res.data.text); 
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [file]);

  return (
    <div className="container md:w-[530px] mx-auto text-center mt-8 p-4">
      <div className="bg-gray-100 p-10 rounded-lg opacity-90">
        <h1 className="font-bold text-2xl md:text-3xl mb-4">Audio to Text</h1>
        <div className="flex gap-4 items-end justify-center">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input
              type="file"
              ref={inputRef}
              accept=".mp3"
              onChange={onChangeFile}
            />
          </div>
        </div>
        {loading ? (
          <div className="pt-10 mx-auto block">
            <div role="status mx-auto">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : response ? (
          <div className="mt-4 text-left">
            <Label>Texto Gerado:</Label>
            <div className="bg-white p-4 rounded border mt-2">
              <p className="text-sm whitespace-pre-wrap">
                {JSON.stringify(response, null, 2)}
              </p>
            </div>
            <Button
              className={`mt-2 ${copied ? "bg-green-500 text-white" : ""}`}
              onClick={copyToClipboard}
            >
              {copied ? "Copiado!" : "Copiar Texto"}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
