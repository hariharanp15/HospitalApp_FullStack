
export default function Upload() {
    const upload = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
  
      await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });
  
      alert("Uploaded!");
    };
  
    return (
      <div>
        <h2>Upload Patient Report</h2>
        <input type="file" onChange={upload} />
      </div>
    );
  }