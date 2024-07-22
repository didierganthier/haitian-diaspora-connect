// utils/getInitials.ts
export const getInitials = (name: string): string => {
    const words = name.split(' ');
    if (words.length < 2) return name.charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  };
  