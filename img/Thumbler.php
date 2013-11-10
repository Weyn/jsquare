<?php
/**
 * Author: Maciek Wegrecki
 * Date: 11/9/13
 * Time: 11:13 AM
 */

class Thumbler {

    protected $dir;
    protected $thumbDir;

    protected $images = array();

    function __construct($dir)
    {
        $this->dir = $dir;
        $this->thumbDir = $dir."/thumbs/";
        $this->getImages();
    }

    protected function getImages()
    {
        $iterator = new FilesystemIterator($this->dir);
        foreach($iterator as $entry) {
            $info = pathinfo($entry);
            switch($info["extension"]){
                case 'jpg':
                case 'png':
                case 'gif':
                    $imageSizes = GetImageSize($entry);

                    $image = new StdClass();
                    $image->path = $entry;
                    $image->width = $imageSizes[0];
                    $image->height = $imageSizes[1];
                    $image->filename = $info['filename'];
                    $image->extension = $info["extension"];

                    $this->images[] = $image;
                    break;
            }
        }
    }

    public function generate($width, $square = true)
    {
        foreach($this->images as $image){
            $ratio = (float) $width / (float) $image->width;
            $cropSrcX = 0;
            $cropSrcY = 0;

            $imageCreateFunction = $this->pickCreateFunction($image->extension);

            if($square) {
                if($image->width < $width && $image->height < $width) {
                    throw new Exception('Image is to small!');
                }

                $height = $width;
                if($image->width != $image->height){
                    $orientation = $image->width > $image->height ? 'vertical' : 'horizontal';

                    switch($orientation){
                        case 'vertical':
                            $cropSrcX = ($image->width - $image->height/2) * $ratio;
                            $image->width = $image->height;
                            break;
                        case 'horizontal':
                            $cropSrcY = ($image->height - $image->width/2) * $ratio;
                            $image->height = $image->width;
                            break;
                    }
                }

            } else {
                if ($width < $image->width){

                    $width = $ratio * $image->width;
                    $height = $ratio * $image->height;
                }
            }

            $newImage = ImageCreateTrueColor($width, $height);
            $oldImage = $imageCreateFunction($image->path);

            ImageCopyResampled($newImage, $oldImage, 0, 0, $cropSrcX, $cropSrcY, $width, $height, $image->width, $image->height);
            if(!ImageJPEG($newImage, $this->thumbDir . $image->filename . '_thumb.jpg')){
                throw new Exception('Error while saving thumb!');
            }
        }

        return true;
    }

    protected function pickCreateFunction($extension){
        $imageCreateFunction = null;
        switch ($extension)
        {
            case 'jpeg':
                $imageCreateFunction = 'ImageCreateFromJPEG';
                break;
            case 'png':
                $imageCreateFunction = 'ImageCreateFromPNG';
                break;
            case 'gif':
                $imageCreateFunction = 'ImageCreateFromGIF';
                break;
            default:
                $imageCreateFunction = 'ImageCreateFromJPEG';
        }

        return $imageCreateFunction;
    }

}