export const OpenResume = async (id) => {
  const newTab = window.open("", "_blank");
  fetch(`http://localhost:7000/register/resume/${id}`)
    .then((res) => res.blob())
    .then((result) => {
      newTab.location.href = URL.createObjectURL(result);
    })
    .catch((err) => {
      console.log("Failed to open resume:", err);
      alert("Unable to open resume");
    });
};
