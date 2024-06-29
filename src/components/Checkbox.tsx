import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

export const Checkbox = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) => {
  return (
    <RadixCheckbox.Root
      className="size-[22px] bg-transparent border-2 border-gray-800 rounded-md [&[data-state=checked]]:bg-gray-800"
      onCheckedChange={onCheckedChange}
      checked={checked}
    >
      <RadixCheckbox.Indicator className="text-blue-100">
        <Check size={16} className="mx-auto" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}
