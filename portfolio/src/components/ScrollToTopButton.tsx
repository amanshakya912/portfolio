import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Detect scroll position
  const checkScrollTop = () => {
    if (!isVisible && window.pageYOffset > 300) {
      setIsVisible(true);
    } else if (isVisible && window.pageYOffset <= 300) {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [isVisible]);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className='z-50 fixed bottom-5 right-5 cursor-pointer text-white bg-blue-500 hover:bg-blue-700 flex items-center justify-center border-0 rounded-full p-4'
      >
        <FontAwesomeIcon icon={faChevronUp}/>
      </button>
    )
  );
};

export default ScrollToTopButton;
