import styles from './PropertyCard.module.css';

function Tag({ children }) {
	return <div className={styles.tag}>{children}</div>;
}

export default Tag;
