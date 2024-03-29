import React from "react";

const currentYear = () => {
  return new Date().getFullYear();
};

const Footer = () => (
  <footer
    className="px-2 md:mx-4 md:px-10 py-6 border-t-2 mt-10 flex items-center justify-between border-gray-400 dark:border-gray-900"
    role="contentinfo"
  >
    <p className="text-gray-600 dark:text-gray-200 text-sm">
      &copy; 2014 - {currentYear()} Saúl Solórzano. Potenciado con
      <a
        href="https://www.gatsbyjs.com/"
        className="hover:text-yellow-700 dark:hover:text-dark-light"
      >
        {" "}
        Gatsby
      </a>{" "}
      y{" "}
      <a
        href="http://sanity.io/"
        className="hover:text-yellow-700 dark:hover:text-dark-light"
      >
        Sanity.io
      </a>
      <br />
      Hospedado en{" "}
      <a
        href="http://www.netlify.com/"
        className="text-gray-600 dark:text-gray-200 hover:text-yellow-700 dark:hover:text-dark-light"
      >
        Netlify.
      </a>
      {"  "} El código se encuentra abierto en{" "}
      <a
        href="https://github.com/saulsolorzano/saulsolorzano.com"
        className="hover:text-yellow-700 dark:hover:text-dark-light"
      >
        Github.
      </a>
    </p>
    <nav className="flex space-x-4">
      <a href="http://twitter.com/saulsolorzano">
        <svg
          className="h-4 w-4 text-gray-400 hover:text-yellow-700 dark:text-gray-200 dark:hover:text-dark-light"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 612 612"
        >
          <path d="M612 116.258c-22.525 9.98-46.694 16.75-72.088 19.772 25.93-15.527 45.777-40.155 55.184-69.41-24.322 14.378-51.17 24.82-79.775 30.48-22.906-24.438-55.49-39.66-91.63-39.66-69.333 0-125.55 56.218-125.55 125.514 0 9.828 1.11 19.427 3.25 28.606-104.325-5.24-196.834-55.223-258.75-131.174-10.822 18.51-16.98 40.078-16.98 63.1 0 43.56 22.182 81.994 55.836 104.48-20.575-.688-39.926-6.348-56.867-15.756v1.568c0 60.806 43.29 111.554 100.692 123.104-10.517 2.83-21.607 4.398-33.08 4.398-8.107 0-15.947-.803-23.634-2.333 15.985 49.907 62.336 86.2 117.253 87.194-42.946 33.655-97.098 53.656-155.915 53.656-10.134 0-20.116-.612-29.944-1.72 55.568 35.68 121.537 56.484 192.44 56.484 230.947 0 357.187-191.29 357.187-357.188l-.42-16.253C573.87 163.525 595.21 141.42 612 116.257z" />
        </svg>
      </a>
      <a href="https://github.com/saulsolorzano">
        <svg
          className="h-4 w-4 text-gray-400 hover:text-yellow-700 dark:text-gray-200 dark:hover:text-dark-light"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          width="512"
          height="512"
          viewBox="0 0 512 512"
        >
          <path d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0zm152.027 408.027c-19.76 19.76-42.756 35.267-68.354 46.094-6.502 2.75-13.105 5.165-19.8 7.247V423c0-20.167-6.917-35-20.75-44.5 8.667-.833 16.624-2 23.874-3.5s14.918-3.667 23-6.5c8.084-2.833 15.334-6.208 21.75-10.125 6.418-3.917 12.584-9 18.5-15.25 5.918-6.25 10.875-13.333 14.875-21.25s7.168-17.417 9.5-28.5c2.334-11.083 3.5-23.292 3.5-36.625 0-25.833-8.416-47.833-25.25-66 7.668-20 6.834-41.75-2.5-65.25l-6.25-.75c-4.332-.5-12.125 1.333-23.375 5.5s-23.875 11-37.875 20.5c-19.832-5.5-40.416-8.25-61.75-8.25-21.5 0-42 2.75-61.5 8.25-8.832-6-17.207-10.958-25.124-14.875s-14.25-6.583-19-8-9.167-2.292-13.25-2.625-6.708-.417-7.875-.25-2 .333-2.5.5c-9.333 23.667-10.167 45.417-2.5 65.25-16.833 18.167-25.25 40.167-25.25 66 0 13.333 1.167 25.542 3.5 36.625s5.5 20.583 9.5 28.5 8.958 15 14.875 21.25 12.083 11.333 18.5 15.25 13.667 7.292 21.75 10.125 15.75 5 23 6.5 15.208 2.667 23.875 3.5c-13.667 9.333-20.5 24.167-20.5 44.5v39.115c-7.55-2.247-14.99-4.902-22.3-7.994-25.597-10.826-48.594-26.334-68.353-46.093-19.758-19.758-35.267-42.756-46.093-68.354C46.68 313.195 41 285.043 41 256s5.68-57.195 16.88-83.675c10.826-25.597 26.334-48.594 46.092-68.353 19.758-19.76 42.756-35.267 68.353-46.093C198.805 46.68 226.957 41 256 41s57.195 5.68 83.676 16.88c25.598 10.826 48.594 26.334 68.354 46.092 19.758 19.758 35.266 42.756 46.092 68.353C465.32 198.805 471 226.957 471 256s-5.68 57.195-16.88 83.675c-10.825 25.596-26.335 48.595-46.093 68.352z" />
        </svg>
      </a>
      <a href="mailto:hola@saulsolorzano.com">
        <svg
          className="h-4 w-4 text-gray-400 hover:text-yellow-700 dark:text-gray-200 dark:hover:text-dark-light"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          width="504.212"
          height="504.212"
          viewBox="0 0 504.212 504.212"
        >
          <path d="M483.25 93.254L272.11 264.078c-11.245 9.182-29.682 9.182-40.927 0L20.043 93.254C12.853 87.44 0 92.49 0 103.046v298.122c0 14.457 11.857 26.314 26.316 26.314h451.58c14.458 0 26.316-11.857 26.316-26.314V103.046c-.077-11.78-12.47-16.6-20.962-9.792zM53.473 93.254l178.322 144.203c11.246 9.027 29.682 9.027 40.928 0L450.968 93.254c11.245-9.027 8.645-16.524-5.814-16.524H59.288c-14.612.077-17.06 7.497-5.815 16.524z" />
        </svg>
      </a>
    </nav>
  </footer>
);

export default Footer;
