import { Button } from "@/components/ui/button";

type InstituteTypes = {
  name?: string;
};

export const Institute = ({ name }: InstituteTypes) => {
  return (
    <Button variant="outline" className="w-60 py-6 pointer-events-none">
      <div className="flex items-center justify-between w-60">
        <div className="flex items-center">
          <span className="mx-2 text-slate-500">หน่วยงาน:</span>
          <span>{name}</span>
        </div>
      </div>
    </Button>
  );
};
