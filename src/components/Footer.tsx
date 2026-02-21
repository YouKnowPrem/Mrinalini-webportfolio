export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full max-w-5xl mx-auto border-t border-primary/20 py-12 mt-24 text-sm text-primary/60 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-0">
            <div className="mb-4 sm:mb-0">
                &copy; {currentYear} Dr. Jane Doe. All rights reserved.
            </div>
            <div className="space-x-4">
                <a href="mailto:contact@janedoe.edu" className="hover:text-primary transition-colors hover:underline">
                    contact@janedoe.edu
                </a>
            </div>
        </footer>
    );
}
