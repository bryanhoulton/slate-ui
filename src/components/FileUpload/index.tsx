import {
  forwardRef,
  useRef,
} from 'react';

import {
  File,
  Loader,
  Upload,
} from 'lucide-react';

import { cn } from '../../utilities';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { FileUploadProps } from './FileUpload.types';

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, uploading, subText, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement | null>(null)

    return (
      <div
        className={cn(
          'flex w-full items-center justify-center text-sm text-black',
          className
        )}
      >
        <label className="border-gray-200 bg-gray-50 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed">
          {uploading ? (
            <>
              <Icon icon={Loader} />
              <p className="text-md mt-2">Uploading...</p>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center pb-3 pt-5">
                <Icon icon={Upload} size="lg" className="mb-2 h-10 w-10" />
                {internalRef?.current?.files?.[0] ? (
                  <div>{internalRef.current.files[0].name}</div>
                ) : (
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
                {subText && <p>{subText}</p>}
              </div>
              <Button
                className="w-fit"
                iconLeft={File}
                type="button"
                onClick={() => internalRef.current?.click()}
              >
                Browse
              </Button>
              {/* https://stackoverflow.com/a/65877297 */}
              <input
                ref={(element) => {
                  internalRef.current = element
                  if (ref === null) return
                  if (typeof ref === 'function') {
                    ref(element)
                  } else {
                    ref.current = element
                  }
                }}
                id="dropzone-file"
                type="file"
                className="hidden"
                {...props}
              />
            </>
          )}
        </label>
      </div>
    )
  }
)

FileUpload.displayName = 'FileUpload'
