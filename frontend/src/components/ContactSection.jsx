import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import API, { endpoints } from "../api/api";

export default function ContactSection() {
  const [info, setInfo] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    API.get(endpoints.contactInfo)
      .then((res) => {
        if (res.data.length > 0) setInfo(res.data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  const onSubmit = async (data) => {
    try {
      await API.post(endpoints.contactMessage, data);
      alert("Message sent successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  return (
    <section className="w-full py-10 md:py-16 font-['Roboto']">
        <h1 className="w-full text-[#07435C] text-2xl font-bold text-center  md:py-2 font-['Roboto']" >Contact Us</h1>
      <div className="container text-black mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Form */}
        
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-6 rounded-xl shadow"
        >
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="w-full border p-3 rounded text-black-500"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            {...register("email", { required: "Email is required" })}
            placeholder="E-mail Address"
            type="email"
            className="w-full border p-3 rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input
            {...register("phone", { required: "Phone is required" })}
            placeholder="Phone Number"
            className="w-full border p-3 rounded"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

          <select
            {...register("reason", { required: "Select a reason" })}
            className="w-full border p-3 rounded"
          >
            <option value="">Reason to Contact</option>
            <option value="support">Support</option>
            <option value="sales">Sales</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
          {errors.reason && <p className="text-red-500">{errors.reason.message}</p>}

          <select
            {...register("find_us", { required: "Select an option" })}
            className="w-full border p-3 rounded"
          >
            <option value="">How did you find out about us?</option>
            <option value="google">Google</option>
            <option value="social">Social Media</option>
            <option value="friends">Friends/Family</option>
            <option value="ads">Advertisement</option>
            <option value="other">Other</option>
          </select>
          {errors.find_us && <p className="text-red-500">{errors.find_us.message}</p>}

          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Message"
            className="w-full border p-3 rounded h-28"
          />
          {errors.message && <p className="text-red-500">{errors.message.message}</p>}

          <button
            type="submit"
            className="bg-[#07435C] text-white px-6 py-2 rounded-lg hover:bg-[#052f41]"
          >
            Send
          </button>
        </form>

            {/* RIGHT: Map + Info */}
            <div className="space-y-4">
            {info?.map_image && (
                <img
                src={info.map_image}
                alt="Map location"
                className="w-full h-[300px] object-cover rounded-xl shadow"
                />
            )}

            <div className="bg-white p-4 rounded-xl shadow">
                <p className="font-bold">{info?.title}</p>
                <p>{info?.address}</p>
                <p>📧 {info?.email}</p>
                <p>📞 {info?.phone}</p>
                {info?.website && <p>🌐 {info.website}</p>}
            </div>
            </div>
      </div>
    </section>
  );
}
