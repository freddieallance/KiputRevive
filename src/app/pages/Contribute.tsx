import { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Mic, Send } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

export const Contribute = () => {
  const { t } = useLanguage();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    toast.info(t("Listening... Speak clearly.", "Sedang mendengar... Sila bercakap dengan jelas."));
    setTimeout(() => {
      setIsRecording(false);
      setValue("example", t("Kuman nasi. (I am eating rice.) - Transcribed from audio", "Kuman nasi. (Saya sedang makan nasi.) - Ditranskrip dari audio"));
      toast.success(t("Audio transcribed successfully!", "Audio berjaya ditranskrip!"));
    }, 3000);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success(t("Thank you for your contribution! Our linguists will review it shortly.", "Terima kasih atas sumbangan anda! Ahli bahasa kami akan menyemaknya tidak lama lagi."));
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">{t("Contribute", "Sumbangan")}</h1>
        <p className="text-lg text-stone-600">
          {t("Help us preserve the Kiput language. Submit new words, stories, or corrections.", "Bantu kami memelihara bahasa Kiput. Hantar perkataan baharu, cerita, atau pembetulan.")}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">{t("Kiput Word / Phrase", "Perkataan / Frasa Kiput")}</label>
                <input
                  {...register("kiputWord", { required: true })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder={t("e.g. Mata", "cth. Mata")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">{t("Translation (English/BM)", "Terjemahan (Inggeris/BM)")}</label>
                <input
                  {...register("translationWord", { required: true })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder={t("e.g. Eye / Mata", "cth. Eye / Mata")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">{t("Example Sentence", "Contoh Ayat")}</label>
              <textarea
                {...register("example")}
                rows={3}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder={t("Share how this word is used in daily life...", "Kongsi bagaimana perkataan ini digunakan dalam kehidupan seharian...")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">{t("Category", "Kategori")}</label>
              <select
                {...register("category")}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="nature">{t("Nature", "Alam Semula Jadi")}</option>
                <option value="daily_life">{t("Daily Life", "Kehidupan Seharian")}</option>
                <option value="culture">{t("Culture & Tradition", "Budaya & Tradisi")}</option>
                <option value="family">{t("Family", "Keluarga")}</option>
                <option value="other">{t("Other", "Lain-lain")}</option>
              </select>
            </div>

            <div className="p-6 bg-stone-50 rounded-xl border border-dashed border-stone-300 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-stone-400">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-stone-900">{t("Upload Media", "Muat Naik Media")}</p>
                <p className="text-sm text-stone-500">{t("Add an image or audio recording", "Tambah imej atau rakaman audio")}</p>
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
                  {isRecording ? t("Recording...", "Sedang Merakam...") : t("Record Audio", "Rakam Audio")}
                </button>
                <button type="button" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-50">
                  {t("Browse Files", "Semak Imbas Fail")}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" /> {t("Submit Contribution", "Hantar Sumbangan")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
