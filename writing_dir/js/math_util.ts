
/**
 * Get a gaussian random number with the provided mean and standard deviation
 * @param mean the mean of the distribution
 * @param stdev the standard deviation of the distribution
 * @returns gaussian random number
 */
export function gaussianRandom(mean=0, stdev=1): number {
    let u = 1 - Math.random(); // Converting [0,1) to (0,1]
    let v = Math.random();
    let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}