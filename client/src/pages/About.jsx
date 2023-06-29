import React from 'react'
import nn1 from '../assets/nn1.gif'
import nn2 from '../assets/nn2.gif'
import nn3 from '../assets/nn3.gif'
import nn4 from '../assets/nn4.gif'
import nn5 from '../assets/nn5.gif'
import nn6 from '../assets/nn6.gif'
import nn7 from '../assets/nn7.gif'
import nn8 from '../assets/nn8.gif'

function About() {
  return (
    <div className='bg-dark-gray min-h-screen'>
    <div className=' p-16 flex flex-wrap justify-around'>
        <div className='m-5 flex flex-col items-center'>
          <h2 className='text-center text-white mb-4 text-2xl'>Neural Network Layers</h2>
          <img src={nn1} alt="nn1" className="w-[40rem]" />
          <p className='text-white mt-2 max-w-xl'>Neural networks are inspired by the human brain, consisting of interconnected nodes or 'neurons'. They learn to recognize patterns in large amounts of input data. Once trained, they can make predictions or process new data based on what they've learned. They're widely used in fields like image recognition and natural language processing.</p>
        </div>
        <div className='m-5 flex flex-col items-center'>
          <h2 className='text-center text-white mb-4 text-2xl'>Input / Output</h2>
          <img src={nn2} alt="nn2" className="w-[40rem]" />
          <p className='text-white mt-2 max-w-xl'>Input in neural networks is the raw data or information that is fed into the network for processing. This could be any kind of data such as images, text, or sound. The input data is passed through layers of neurons, with each layer learning to recognize more complex patterns. Output in neural networks is the result after the input data has been processed through all layers of the network. The output is determined based on what the network has learned during its training phase.</p>
        </div>
        <div className='m-5 flex flex-col items-center'>
          <h2 className='text-center text-white mb-4 text-2xl'>Layer Size</h2>
          <img src={nn3} alt="nn3" className="w-[40rem]" />
          <p className='text-white mt-2 max-w-xl'>Layer size in a neural network refers to the number of neurons or nodes present in a single layer. The size can significantly influence the network's performance. A larger layer can potentially learn more complex patterns, but may also risk overfitting to the training data. Conversely, a smaller layer might not capture all relevant patterns, possibly leading to underfitting. Choosing the right layer size is a crucial aspect of neural network design and often requires experimentation</p>
        </div>
        <div className='m-5 flex flex-col items-center'>
          <h2 className='text-center text-white mb-4 text-2xl'>Weights / Biases</h2>
          <img src={nn4} alt="nn4" className="w-[40rem]" />
          <p className='text-white mt-2 max-w-xl'>Weights in neural networks multiply the input data and are adjusted during training to improve predictions. Biases are additional constants added to the weighted input, enabling more flexibility in fitting the data</p>
        </div>
        <div className='m-5 flex flex-col items-center'>
          <h2 className='text-center text-white mb-4 text-2xl'>Batch Size</h2>
          <img src={nn5} alt="nn5" className="w-[40rem]" />
          <p className='text-white mt-2 max-w-xl'>Batch size refers to the number of training examples used in one iteration of model training. The larger the batch size, the more memory space you need. A smaller batch size can make the training process faster, but the model's performance may vary. The choice of batch size can significantly affect model accuracy, speed of convergence, and computational efficiency</p>
        </div>
        <div className='m-5 flex flex-col items-center'>
          <h2 className='text-center text-white mb-4 text-2xl'>Rectify Linear Activation</h2>
          <img src={nn6} alt="nn6" className="w-[40rem]" />
          <p className='text-white mt-2 max-w-xl'>Rectified Linear Activation, often abbreviated as ReLU, is a popular activation function in neural networks. It operates by outputting the input directly if it's positive, otherwise, it outputs zero. Its simplicity and efficiency in terms of computation make it a common choice for many types of neural networks</p>
        </div>
        <div className='m-5 flex flex-col items-center'>
          <h2 className='text-center text-white mb-4 text-2xl'>Exponentiation</h2>
          <img src={nn7} alt="nn7" className="w-[40rem]" />
          <p className='text-white mt-2 max-w-xl'>one of the reasons we use exponentiation in some cases, particularly in the context of neural networks, is to avoid negative values. When you raise Euler's number (e) to any power, the result is always a positive number. This is especially useful in scenarios like the softmax activation function, where we want to convert raw scores to positive probabilities that sum to 1</p>
        </div>
        <div className='m-5 flex flex-col items-center'>
          <h2 className='text-center text-white mb-4 text-2xl'>Exponentiate</h2>
          <img src={nn8} alt="nn8" className="w-[40rem]" />
          <p className='text-white mt-2 max-w-xl'>The softmax function takes an un-normalized set of scores and makes them into probabilities by exponentiating each score and then normalizing these values. By doing so, softmax ensures the output probabilities are positive and their total sums up to one, making it easier to interpret the output of a multi-class classification problem</p>
        </div>
    </div>
    <p className='text-center text-gray-400 mt-10'>
        Sources: [https://www.youtube.com/@sentdex]
      </p>

    </div>
  )
}

export default About
