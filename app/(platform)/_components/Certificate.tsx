import moment from "moment";
import "moment/locale/th";
import Image from "next/image";

type CertificateProps = {
  name?: string;
  course?: string;
  dateOfStudyStart?: string;
  dateOfStudyEnd?: string;
  signature: string;
  signName: string;
  stampImageUrl?: string;
};

export const Certificate = ({
  name,
  course,
  dateOfStudyStart,
  dateOfStudyEnd,
  signature,
  signName,
  stampImageUrl,
}: CertificateProps) => {
  const formatThaiDate = (date: string | undefined) => {
    return date && moment(date).isValid()
      ? `${moment(date).locale("th").format("D MMMM")} ${moment(date)
          .add(543, "years")
          .format("YYYY")}`
      : "";
  };

  const dashValue = (date: string | undefined) => {
    return date != undefined ? "-" : "";
  };

  return (
    <div className="flex items-center justify-center w-full h-full text-black">
      <div className="bg-white p-8 w-[1122px] aspect-[3/2] text-center -translate-x-3">
        <div className="border-4 border-black p-8 flex flex-col h-full justify-between">
          <div className="flex items-center justify-center">
            <Image src="/mwa-logo.png" alt="certlogo" width={96} height={96} />
          </div>

          {/* <h1 className="text-5xl font-bold my-4">CERTIFICATE OF COMPLETION</h1>  */}
          {/* <span className="text-xl">This is to certify that</span> */}
          <h1 className="text-5xl font-bold my-4">โครงการอบรมเชิงปฏิบัติการ</h1>
          <span className="text-xl">ประกาศนียบัตรนี้ให้ไว้เพื่อแสดงว่า</span>
          <p className="text-blue-600 text-5xl font-bold italic my-4 whitespace-nowrap ">
            {name}
          </p>
          <span className="text-lg">
            {/* has successfully completed the course on */}
            ได้เข้าร่วมอบรมในหลักสูตร
          </span>
          <h2 className="text-4xl font-semibold text-green-500 my-4">
            {course}
          </h2>
          <span className="text-xl">
            {`${formatThaiDate(dateOfStudyStart)} ${dashValue(
              dateOfStudyEnd
            )} ${formatThaiDate(dateOfStudyEnd)}`}
          </span>
          <div className="mt-12 inline-block">
            {signature && (
              <div className="flex items-center justify-center">
                <Image
                  className="font-bold"
                  src={signature as string}
                  alt="signature"
                  width={100}
                  height={100}
                />
              </div>
            )}
            <span className="block h-px w-48 bg-black mx-auto mb-2"></span>
            <span className="text-sm">{signName}</span>
          </div>
        </div>
        {stampImageUrl && (
          <Image
            src={stampImageUrl}
            alt="Stamp"
            className="absolute bottom-10 right-10 w-36 h-36 opacity-85"
            width={144}
            height={144}
          />
        )}
      </div>
    </div>
  );
};
