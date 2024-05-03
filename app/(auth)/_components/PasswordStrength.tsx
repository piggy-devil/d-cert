import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  passStrength: number;
}

const PasswordStrength = ({ passStrength }: PasswordStrengthProps) => {
  return (
    <div
      className={cn(" col-span-2 flex gap-2", {
        "justify-around": passStrength === 3,
        "justify-start": passStrength < 3,
      })}
    >
      {Array.from({ length: passStrength + 1 }).map((i, index) => (
        <div
          key={index}
          className={cn("h-2 rounded-md", {
            "bg-red-500 w-1/4": passStrength === 0,
            "bg-orange-500 w-1/4": passStrength === 1,
            "bg-yellow-500 w-1/4": passStrength === 2,
            "bg-green-500 w-full": passStrength === 3,
          })}
        ></div>
      ))}
    </div>
  );
};

export default PasswordStrength;
