import './globals.css';
import "react-datepicker/dist/react-datepicker.css";

import appConfig from "@/config/appConfig";
import LayoutProvider from "@/components/Layout/LayoutProvider";

export const metadata = {
    title: appConfig.app_name,
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <LayoutProvider>
                    {children}
                </LayoutProvider>
            </body>
        </html>
    );
}
