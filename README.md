# Form Builder

Form Builder is a dynamic form creation tool built with Next.js, React DnD, React Hook Form, and React Query. It allows users to build and customize forms with drag-and-drop capabilities, reorder form fields, and manage form data efficiently.

## Installation

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed.

### Steps to install

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/form-builder.git
   cd form-builder
2. Install the dependencies:

If you're using npm:
```bash
npm install
```
Or if you're using yarn:
```bash
yarn install
```
3. Start the development server:
```bash
npm run dev
```
Or if you're using yarn:
```bash
yarn dev
```

## Usage

Once the app is running at `http://localhost:3000`:

- The app will fetch the form data from `/api/data.json`, which contains the form structure in JSON format. The form will be dynamically rendered based on this data in the main area.
  
- On the left side, you'll see a list of **default form fields** (e.g., text input, checkbox, etc.) that you can **drag and drop** into the main form area to build your form.

You can toggle between **Preview Mode** and **Builder Mode** using a button at the top-left corner of the main form area:
  - **Preview Mode**: Displays a fully rendered, interactive preview of the form, as it will appear to end-users.
  - **Builder Mode**: Allows you to edit and arrange the form by dragging and dropping fields, re-ordering them, or configuring field options.

- On **builder mode** you'll see a clickable **options menu** for each field on hover. This menu allows you to:
  - **Settings**: Customize the field (e.g., change label, name, etc.).
  - **Duplicate**: Create a copy of the field.
  - **Delete**: Remove the field from the form.

- On **builder mode** Fields can also be **re-ordered** by dragging them into the desired position within the main area.
  
- Form data is managed with **react-hook-form**, which simplifies form state management.

## Libraries Used

- [Next.js](https://nextjs.org/)  
  The React framework for production.

- [react-dnd](https://react-dnd.github.io/react-dnd)  
  Drag and drop abstraction for building dynamic forms.

- [react-hook-form](https://react-hook-form.com/)  
  Efficient form handling with minimal re-renders.

- [react-query](https://tanstack.com/query)  
  Data-fetching and state management.

## Contact Information
- **Email**: [mdlimon0175@gmail.com](mailto:mdlimon0175@gmail.com)
- **WhatsApp**: [+8801568113207](https://wa.me/8801568113207)
- **Facebook**: [fb.com/limon.btcz](https://fb.com/limon.btcz)