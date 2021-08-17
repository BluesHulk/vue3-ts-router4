import { removeButtonsKey, removePermission } from '@/storage/permission'

export function remove() {
  removeButtonsKey()
  removePermission()
}
