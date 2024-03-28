import React from "react";

interface IMessageProps {
  variant: string;
  children: React.ReactNode;
}

const Message = ({ variant, children }: IMessageProps) => {
  const variantStyles = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <div className={`${variantStyles[variant]} p-4 rounded-md m-4`}>
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
