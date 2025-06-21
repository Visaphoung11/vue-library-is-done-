import { ref, computed, type Ref, type ComputedRef } from "vue";
import type { Translations } from "../types";

const language: Ref<"en" | "km"> = ref("en");

const translations: Translations = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.books": "Books",
    "nav.students": "Students",
    "nav.borrowing": "Borrowing",
    "nav.logout": "Logout",
    "nav.welcome": "Welcome",
    "dashboard.title": "Dashboard",
    "dashboard.overdue": "Manage your library efficiently",
    "students.title": "Students List",
    "students.new": "New",
    "students.no": "No",
    "students.name": "Name",
    "students.id": "ID",
    "students.edit": "Edit",
    "students.action": "Action",
    "students.number": "Number",
    "students.add": "Add",
    "students.delete": "Delete",
    "books.overview": "Manage your library books",
    "books.title": "Books List",
    "books.add": "Add",
    "books.edit": "Edit",
    "books.update": "Update Book",
    "books.delete": "Delete",
    "books.cancel": "Cancel",
    "books.created": "Book created",
    "books.deleted": "Book deleted successfully!",
    "books.fetch_failed": "Failed to fetch books",
    "books.create_failed": "Failed to create book",
    "books.fields.no": "No",
    "books.fields.title": "Title",
    "books.fields.description": "Description",
    "books.fields.author_id": "Author ID",
    "books.fields.created_by": "Created By",
    "books.errors.title_required": "Title is required",
    "books.errors.title_unique": "Title must be unique",
    "books.errors.description_required": "Description is required",
    "books.errors.author_id_required": "Author ID must be a positive number",
    "auth.login_required": "Please log in to access this page",
  },
  km: {
    "nav.dashboard": "ផ្ទាំងគ្រប់គ្រង",
    "nav.books": "សៀវភៅ",
    "nav.students": "សិស្ស",
    "nav.borrowing": "ការខ្ចី",
    "nav.logout": "ចាកចេញ",
    "nav.welcome": "សូមស្វាគមន៍",
    "dashboard.title": "ផ្ទាំងគ្រប់គ្រង",
    "dashboard.overdue": "គ្រប់គ្រងបណ្ណាល័យរបស់អ្នកឱ្យមានប្រសិទ្ធភាព",
    "students.title": "បញ្ជីសិស្ស",
    "students.new": "ថ្មី",
    "students.no": "លេខ",
    "students.name": "ឈ្មោះ",
    "students.id": "អត្តសញ្ញាណ",
    "students.edit": "កែសម្រួល",
    "students.action": "សកម្មភាព",
    "students.number": "លេខទំនាក់ទំនង",
    "students.add": "បន្ថែម",
    "students.delete": "លុប",
    "books.overview": "គ្រប់គ្រងសៀវភៅបណ្ណាល័យរបស់អ្នក",
    "books.title": "បញ្ជីសៀវភៅ",
    "books.add": "បន្ថែម",
    "books.edit": "កែសម្រួល",
    "books.update": "ធ្វើបច្ចុប្បន្នភាពសៀវភៅ",
    "books.delete": "លុប",
    "books.cancel": "បោះបង់",
    "books.created": "សៀវភៅបានបង្កើត",
    "books.deleted": "សៀវភៅបានលុបដោយជោគជ័យ!",
    "books.fetch_failed": "បរាជ័យក្នុងការទៅយកសៀវភៅ",
    "books.create_failed": "បរាជ័យក្នុងការបង្កើតសៀវភៅ",
    "books.fields.no": "លេខ",
    "books.fields.title": "ចំណងជើង",
    "books.fields.description": "ការពិពណ៌នា",
    "books.fields.author_id": "លេខសម្គាល់អ្នកនិពន្ធ",
    "books.fields.created_by": "បង្កើតដោយ",
    "books.errors.title_required": "ចំណងជើងត្រូវបានទាមទារ",
    "books.errors.title_unique": "ចំណងជើងត្រូវតែប្លែក",
    "books.errors.description_required": "ការពិពណ៌នាត្រូវបានទាមទារ",
    "books.errors.author_id_required":
      "លេខសម្គាល់អ្នកនិពន្ធត្រូវតែជាលេខវិជ្ជមាន",
    "auth.login_required": "សូមចូលគណនីដើម្បីចូលប្រើទំព័រនេះ",
  },
};

export function useLanguage() {
  const setLanguage = (lang: "en" | "km"): void => {
    language.value = lang;
    localStorage.setItem("library_language", lang);
  };

  const t = (key: string): string => {
    return translations[language.value][key] || key;
  };

  // Initialize from localStorage
  const savedLanguage = localStorage.getItem("library_language");
  if (savedLanguage && (savedLanguage === "en" || savedLanguage === "km")) {
    language.value = savedLanguage as "en" | "km";
  }

  return {
    language: computed(() => language.value),
    setLanguage,
    t,
  };
}
