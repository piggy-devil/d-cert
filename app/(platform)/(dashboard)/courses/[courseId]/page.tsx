type CourseIdPageTypes = {
  params: { courseId: string };
};

const CourseIdPage = ({ params }: CourseIdPageTypes) => {
  return <div>CourseIdPage {params.courseId}</div>;
};

export default CourseIdPage;
