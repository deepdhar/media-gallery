import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, Typography, Button, FormControl, InputLabel, Select, MenuItem  } from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';

const Dashboard = () => {
    const [media, setMedia] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMedia();
    }, []);

    console.log("Token used:", localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove auth token from local storage
        window.location.href = "/login"; // Redirect to login page
    };

    const fetchMedia = async () => {
        const token = localStorage.getItem('token');
        console.log("Stored Token:", token);  // Debugging Log ✅

        if (!token) {
            console.error("No token found, user may not be logged in.");
            return;
        }

        try {
            const response = await axios.get('https://my-media-app-backend.herokuapp.com/api/media', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setMedia(response.data);
        } catch (err) {
            console.error('Failed to fetch media:', err.response?.status, err.response?.data);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://my-media-app-backend.herokuapp.com/api/media/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setMedia(media.filter(item => item._id !== id));
            fetchMedia(); // Refresh the media list
        } catch (err) {
            console.error('Failed to delete media:', err);
        }
    };

    // Handle file selection & preview
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file)); // Generate preview URL
        }
    };

    const handleUpload = async (event) => {
        if (!selectedFile) {
            alert("Please select a file to upload!");
            return;
        }

        setLoading(true); // Show loader

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post('https://my-media-app-backend.herokuapp.com/api/media/upload', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                setSelectedFile(null);
                setPreview(null);
                console.log("Upload successful!");
                fetchMedia(); // Fetch latest media
            } else {
                alert("Upload failed.");
            }

            // setMedia([...media, response.data]); // Update media list
        } catch (err) {
            console.error('Upload failed:', err);
        }
        setLoading(false);
    };

    const sortedFilteredMedia = [...media].filter(item => {
        if (filter === 'images') return item.filename.match(/\.(jpg|jpeg|png|gif|svg)$/i);
        if (filter === 'videos') return item.filename.match(/\.(mp4|mov|avi)$/i);
        return true;
    }).sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));


    return (
        <Container>
            <div style={{flexDirection: 'row', flex: 1, display: 'flex', paddingBottom: 60, paddingTop: 20}}>
                <Typography variant='h4' style={{ flexGrow: 1, fontFamily: '-moz-initial', fontWeight: '600' }}>
                    Media Gallery
                </Typography>
                <div style={{marginBottom: 10, height: 20}}>
                    <FormControl fullWidth style={{ maxWidth: 200, marginTop: -5 }}>
                        {/* <InputLabel id="filter-label">Filter</InputLabel> */}
                        <Select
                            labelId="filter-label"
                            id="filter-select"
                            value={filter}
                            label="Filter"
                            onChange={(e) => setFilter(e.target.value)}
                            sx={{
                                backgroundColor: (theme) => theme.palette.background.filter,
                                borderRadius: '4px',
                                border: 'none',
                                boxShadow: 'none',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                            }}
                        >
                        <MenuItem value="all">All Media</MenuItem>
                        <MenuItem value="images">Images</MenuItem>
                        <MenuItem value="videos">Videos</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Button 
                    style={{marginLeft: 10, fontWeight: '500', height: 40}} 
                    variant="contained" 
                    component="label" 
                    startIcon={<CloudUploadIcon />}
                    sx={{
                        backgroundColor: '#1976d2', // Blue color
                        color: 'white',
                        borderRadius: '8px',
                        padding: '5px 20px',
                        textTransform: 'none', // Prevents uppercase text
                        '&:hover': {
                          backgroundColor: '#1565c0', // Darker blue on hover
                        },
                    }}
                >
                    Upload Media
                    <input type="file" hidden onChange={handleFileChange} className="mb-2" />
                </Button>
                <Button 
                    style={{marginLeft: 10, backgroundColor: 'white', fontWeight: '500', height: 40}} 
                    variant="contained" 
                    component="label" 
                    startIcon={<LogoutIcon />}
                    onClick={() => handleLogout()}
                    sx={{
                        borderColor: '#fff', // Blue border
                        color: '#1976d2', // Blue text
                        borderRadius: '8px',
                        padding: '5px 20px',
                        textTransform: 'none', // Prevents uppercase text
                        '&:hover': {
                          backgroundColor: '#fff', // Blue background on hover
                          color: '#1976d2', // White text on hover
                        },
                    }}
                >
                    Logout
                </Button>
            </div>

            {preview && (
                <div style={{marginBottom: 30}}>
                    <h3 className="text-lg font-semibold">Preview</h3>
                    <img 
                        src={preview} 
                        alt="Preview" 
                        width={'100%'}
                        height={'100%'}
                    />
                    <Button 
                        variant="contained" 
                        component="label" 
                        sx={{
                            borderColor: '#1976d2', // Blue border
                            color: '#fff', // Blue text
                            borderRadius: '4px',
                            marginTop: '10px',
                            padding: '8px 20px',
                            textTransform: 'none', // Prevents uppercase text
                            '&:hover': {
                              backgroundColor: '#1976d2', // Blue background on hover
                              color: 'white', // White text on hover
                            },
                        }}
                        onClick={handleUpload}>
                        {loading ? "Uploading..." : "Upload"}
                    </Button>
                </div>
            )}

            {loading ? <p className="text-blue-500">Uploading and fetching latest media...</p>
            : <>

            

            <Grid container spacing={3}>
            {sortedFilteredMedia.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={4}>
                    <Card 
                        sx={{
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.8)', // Custom shadow
                            borderRadius: '8px', // Optional: Add rounded corners
                            transition: 'box-shadow 0.3s ease-in-out', // Optional: Add hover effect
                            '&:hover': {
                              boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)', // Shadow on hover
                            },
                          }}
                    >
                        <CardMedia
                            component={item.filename.match(/\.(mp4|mov|avi)$/i) ? 'video' : 'img'}
                            src={item.url || 'default-placeholder.png'}  // Fallback to a default image
                            alt={item.filename}
                            controls={item.filename.match(/\.(mp4|mov|avi)$/i)}
                            style={{ height: '200px', objectFit: 'cover' }}
                            onError={(e) => e.target.src = 'default-placeholder.png'} // Handle broken images
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => handleDelete(item._id)}
                            startIcon={<DeleteIcon />}
                            sx={{
                                backgroundColor: '#000',
                                color: (theme) => theme.palette.getContrastText('#000'), // Dynamically set text color
                                '&:hover': {
                                  backgroundColor: '#333', // Darker black on hover
                                },
                            }}
                        >
                            Delete
                        </Button>
                    </Card>
                </Grid>
            ))}
            </Grid>
            </>}
        </Container>
    );
};

export default Dashboard;