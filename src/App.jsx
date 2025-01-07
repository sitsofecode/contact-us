import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    phone: "",
    communicationMethod: "",
    messages: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Veuillez entrer votre nom.";
    if (!formData.mail.trim()) newErrors.mail = "Veuillez entrer votre email.";
    if (!formData.phone.trim())
      newErrors.phone = "Veuillez entrer votre numéro.";
    if (!formData.communicationMethod)
      newErrors.communicationMethod =
        "Veuillez sélectionner une méthode de communication.";
    if (!formData.messages.trim())
      newErrors.messages = "Veuillez entrer votre message.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { name, messages, communicationMethod } = formData;
    const prefilledMessage = encodeURIComponent(
      `Bonjour, je suis ${name}. ${messages}`
    );

    if (communicationMethod === "phone") {
      const whatsappURL = `https://wa.me/+22998035027?text=${prefilledMessage}`;
      window.open(whatsappURL, "_blank");
    } else if (communicationMethod === "email") {
      const mailtoURL = `mailto:samuelsenouvo@gmail.com?subject=Contact%20depuis%20Go%20Market&body=${encodeURIComponent(
        prefilledMessage
      )}`;
      window.location.href = mailtoURL;
    }
  };

  const ErrorMessage = ({ message }) => (
    <p className="text-red-500 text-sm mt-1">{message}</p>
  );

  const InputField = ({ type, name, placeholder }) => (
    <>
      <input
        type={type}
        value={formData[name]}
        onChange={(e) => handleChange(name, e.target.value)}
        className={`border p-2 bg-transparent rounded-lg text-gray-700 w-full outline-none ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />
      {errors[name] && <ErrorMessage message={errors[name]} />}
    </>
  );

  return (
    <div className="relative bg-[url('https://as2.ftcdn.net/v2/jpg/02/02/01/59/1000_F_202015909_QyoIiOw2xi7dE371O2hpDQhRMGxVdVTt.jpg')] w-screen bg-no-repeat bg-cover lg:h-screen flex items-center justify-center">
      <div className="bg-gradient-to-b from-purple-700 to-pink-500/50 w-full lg:h-screen flex flex-col md:flex-row items-start justify-between px-10 py-10 ">
        <div className="hidden md:flex  flex-col space-y-5 text-white max-w-sm">
          <h1 className="text-4xl font-semibold">Contact us</h1>
          <p className="text-gray-300">
            Get in touch with us! Whether you have a question, feedback, or just
            want to say hello, we're here for you.
          </p>
          <div className=" relative top-20   ">
            <div className="w-48 bg-pink-500 h-16 absolute -top-10 rounded-lg"></div>
            <div className="w-6 bg-pink-500 h-6 absolute top-2 left-24 rotate-45"></div>
            <div className="w-2 rounded-full   h-2 absolute top-10 left-24 ml-2  inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full ">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-100 animate-ping"></div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 w-full max-w-lg rounded-lg shadow-lg">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Send us a message
            </h2>

            <InputField type="text" name="name" placeholder="Name" />
            <InputField type="email" name="mail" placeholder="Email" />
            <InputField type="text" name="phone" placeholder="Phone" />

            <label className="text-gray-400 font-normal">
              Preferred method of communication
            </label>
            <div className="flex space-x-10">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="communicationMethod"
                  value="phone"
                  onChange={(e) =>
                    handleChange("communicationMethod", e.target.value)
                  }
                  className="accent-blue-500"
                />
                <span className="text-gray-400">WhatsApp</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="communicationMethod"
                  value="email"
                  onChange={(e) =>
                    handleChange("communicationMethod", e.target.value)
                  }
                  className="accent-blue-500"
                />
                <span className="text-gray-400">E-mail</span>
              </label>
            </div>
            {errors.communicationMethod && (
              <ErrorMessage message={errors.communicationMethod} />
            )}

            <div>
              <textarea
                value={formData.messages}
                onChange={(e) => handleChange("messages", e.target.value)}
                className={`border p-2 h-28 rounded-lg text-gray-700 w-full outline-none ${
                  errors.messages ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your message"
              />
              {errors.messages && <ErrorMessage message={errors.messages} />}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl text-white bg-pink-500 hover:bg-pink-500/80 p-2"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
