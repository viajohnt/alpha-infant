import React, { useState } from 'react';
import useUserStore from '../hooks/userStore';

function CreateBabyForm() {
  const { user } = useUserStore();
  const [name, setName] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch('/api/babies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          user_id: user.id, // using zustand state
        }),
      });

      if (response.status === 201) {
        const responseData = await response.json();
        alert(`Baby ${responseData.name} created successfully with model path: ${responseData.model_path}`);
        setName('');
      } else {
        const responseData = await response.json();
        alert(responseData.error || 'Error creating baby');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating baby');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
        placeholder="Baby Name"
        required
      />
      <button type="submit">
        Create Baby
      </button>
    </form>
  );
}

export default CreateBabyForm;
