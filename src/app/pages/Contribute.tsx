import { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Mic, Send } from "lucide-react";
import { toast } from "sonner";

export const Contribute = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    toast.info("Listening... Speak clearly.");
    setTimeout(() => {
      setIsRecording(false);
      setValue("example", "Kuman nasi. (I am eating rice.) - Transcribed from audio");
      toast.success("Audio transcribed successfully!");
    }, 3000);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success("Thank you for your contribution! Our linguists will review it shortly.");
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Contribute</h1>
        <p className="text-lg text-stone-600">
          Help us preserve the Kiput language. Submit new words, stories, or corrections.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">Kiput Word / Phrase</label>
                <input
                  {...register("kiputWord", { required: true })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Mata"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">English Translation</label>
                <input
                  {...register("englishWord", { required: true })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Eye"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">Example Sentence</label>
              <textarea
                {...register("example")}
                rows={3}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Share how this word is used in daily life..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">Category</label>
              <select
                {...register("category")}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="nature">Nature</option>
                <option value="daily_life">Daily Life</option>
                <option value="culture">Culture & Tradition</option>
                <option value="family">Family</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="p-6 bg-stone-50 rounded-xl border border-dashed border-stone-300 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-stone-400">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-stone-900">Upload Media</p>
                <p className="text-sm text-stone-500">Add an image or audio recording</p>
              </div>
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={startRecording}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isRecording 
                      ? "bg-red-50 border-red-200 text-red-600 animate-pulse" 
                      : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <Mic className={`h-4 w-4 ${isRecording ? "animate-ping" : ""}`} /> 
                  {isRecording ? "Recording..." : "Record Audio"}
                </button>
                <button type="button" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-50">
                  Browse Files
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" /> Submit Contribution
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
