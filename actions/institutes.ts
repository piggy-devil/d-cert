export const getInstitutes = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/institutes?_id=${id}`,
      {
        method: "GET",
      }
    );

    if (response.status === 200) {
      return response.json();
    }

    return null;
  } catch {
    return null;
  }
};
