import { Form } from '@/types'

class FormStorage {
  private forms: Map<string, Form> = new Map()

  saveForm(form: Form): void {
    this.forms.set(form.id, form)
  }

  getForm(id: string): Form | undefined {
    return this.forms.get(id)
  }

  getAllForms(): Form[] {
    return Array.from(this.forms.values())
  }

  deleteForm(id: string): boolean {
    return this.forms.delete(id)
  }
}

export const formStorage = new FormStorage()
