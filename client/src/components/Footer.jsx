const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 text-center p-4 mt-auto border-t border-gray-700">
      <p>
        &copy; {new Date().getFullYear()} Carbon Tracker. All Rights Reserved.
      </p>
      <p className="text-sm mt-1">Made with ❤️ in India</p>
    </footer>
  );
};

export default Footer;
