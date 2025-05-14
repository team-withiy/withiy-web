import type { ReactNode } from "react";

import { type DropzoneOptions, useDropzone } from "react-dropzone";

interface Props {
  children: ReactNode;
  options?: DropzoneOptions;
  className?: string;
}

const Dropzone: React.FC<Props> = ({ children, options, className }) => {
  const { getRootProps, getInputProps } = useDropzone({ ...options, noDragEventsBubbling: true });

  return (
    <div {...getRootProps()} className={className}>
      <input type="file" hidden {...getInputProps()} />
      {children}
    </div>
  );
};

export default Dropzone;
