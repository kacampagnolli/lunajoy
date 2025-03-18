import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useServer } from "../contexts/ServerContext";
import RangeInput from "./RangeInput";

interface NewLogFormProps {
  onClose: () => void;
}

interface LogFormData {
  mood: number;
  anxiety: number;
  sleepHours: number;
  sleepQuality: number;
  sleepDisturbance: string | null;
  physicalActivityType: string | null;
  physicalActivityDuration: number | null;
  socialInteractions: string | null;
  stress: number;
  symptomDetails: string | null;
}

const NewLogForm: React.FC<NewLogFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {
      errors
    }
  } = useForm<LogFormData>({
    defaultValues: {
      mood: 5,
      anxiety: 5,
      sleepHours: 8,
      stress: 5,
      sleepQuality: 5
    }
  });

  const queryClient = useQueryClient();
  const { healthService } = useServer();

  const mutation = useMutation(
    (newLog: LogFormData) => healthService.createHealthLog(newLog),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("logs");
        toast.success("Health log created successfully!");
        onClose();
      },
      onError: () => {
        toast.error("Failed to create health log. Please try again.");
      }
    }
  );

  const onSubmit = (data: LogFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
     <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">New Health Log</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-2">
            <RangeInput
              label="Mood"
              min={1}
              max={10}
              value={getValues("mood")}
              onChange={(val) => setValue("mood", val, { shouldValidate: true })}
              error={errors.mood ? errors.mood.message : undefined}
            />
          </div>
          <div className="mb-2">
            <RangeInput
              label="Anxiety"
              min={1}
              max={10}
              value={getValues("anxiety")}
              onChange={(val) => setValue("anxiety", val, { shouldValidate: true })}
            />
          </div>
          <div className="mb-2">
            <RangeInput
              label="Sleep Hours"
              min={0}
              max={24}
              value={getValues("sleepHours")}
              onChange={(val) => setValue("sleepHours", val, { shouldValidate: true })}
            />
          </div>
          <div className="mb-2">
            <RangeInput
              label="Sleep Quality"
              min={1}
              max={10}
              value={getValues("sleepQuality")}
              onChange={(val) => setValue("sleepQuality", val, { shouldValidate: true })}
            />
          </div>
          <div className="mb-2">
            <RangeInput
              label="Stress"
              min={1}
              max={10}
              value={getValues("stress")}
              onChange={(val) => setValue("stress", val, { shouldValidate: true })}
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Sleep Disturbance</label>
            <input
              type="text"
              className="border p-2 w-full"
              {...register("sleepDisturbance",  { value: null })}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Physical Activity Type</label>
            <input
              type="text"
              className="border p-2 w-full"
              {...register("physicalActivityType",  { value: null })}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Physical Activity Duration (minutes)</label>
            <input
              type="number"
              className="border p-2 w-full"
              {...register("physicalActivityDuration", { value: null, valueAsNumber: true })}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Social Interactions</label>
            <input
              type="text"
              className="border p-2 w-full"
              {...register("socialInteractions",  { value: null })}
            />
          </div>
          <div className="mb-2 md:col-span-2">
            <label className="block mb-1">Symptom Details</label>
            <textarea
              className="border p-2 w-full"
              {...register("symptomDetails",  { value: null })}
            ></textarea>
          </div>

          <div className="md:col-span-2 flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[rgb(51,87,84)] text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLogForm;
