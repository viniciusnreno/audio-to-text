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

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  React.useEffect(() => {
    console.log(file);

    const fetchData = async () => {
      if (!file) return;

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

        setResponse(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [file]);

  return (
    <div className="container md:w-[530px] mx-auto text-center mt-8 p-4">
      <div className="bg-gray-100 p-10 rounded-lg opacity-90">
        <h1 className="font-bold text-2xl md:text-3xl mb-4">Audio to Text</h1>
        <div className="flex gap-4 items-end justify-center ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input
              type="file"
              ref={inputRef}
              accept=".mp3"
              onChange={onChangeFile}
            />
          </div>
        </div>
        {response && <div> {JSON.stringify(response, null, 2)}</div>}
      </div>
    </div>
  );
};

export default HomePage;
